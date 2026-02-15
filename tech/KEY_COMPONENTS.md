# Contractie MVP - Key Components

## 1. JobCard

Displays job summary in list view.

```tsx
// components/cards/JobCard.tsx
interface JobCardProps {
  job: {
    id: string;
    title: string;
    trade: string;
    zip_code: string;
    budget_min: number;
    budget_max: number;
    created_at: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <h3>{job.title}</h3>
          <Badge>{job.trade}</Badge>
          <span>{job.zip_code}</span>
        </div>
        <div>
          <p>${job.budget_min} - ${job.budget_max}</p>
          <p>{timeAgo(job.created_at)}</p>
        </div>
      </div>
      <Link href={`/jobs/${job.id}`}>
        <Button>View Details</Button>
      </Link>
    </Card>
  );
}
```

## 2. ContractorCard

Displays contractor profile summary.

```tsx
// components/cards/ContractorCard.tsx
interface ContractorCardProps {
  contractor: {
    id: string;
    full_name: string;
    trade: string;
    bio: string;
    photos: string[];
    license_verified: boolean;
    zip_code: string;
  };
}

export function ContractorCard({ contractor }: ContractorCardProps) {
  return (
    <Card>
      <div className="flex gap-4">
        <Avatar src={contractor.photos[0]} />
        <div>
          <h3>{contractor.full_name}</h3>
          <Badge>{contractor.trade}</Badge>
          {contractor.license_verified && <Badge variant="success">Verified</Badge>}
          <p>{contractor.zip_code}</p>
        </div>
      </div>
      <p className="line-clamp-2">{contractor.bio}</p>
    </Card>
  );
}
```

## 3. JobPostForm

Form for homeowners to post jobs + Stripe payment.

```tsx
// components/forms/JobPostForm.tsx
export function JobPostForm() {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    trade: '',
    zip_code: '',
    budget_min: '',
    budget_max: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 1. Create job in DB with status 'pending_payment'
    const { data: job } = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ ...jobData, status: 'pending_payment' })
    }).then(r => r.json());

    // 2. Create Stripe checkout session
    const { url } = await fetch('/api/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({ job_id: job.id })
    }).then(r => r.json());

    // 3. Redirect to Stripe
    window.location.href = url;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        label="Job Title"
        value={jobData.title}
        onChange={e => setJobData({...jobData, title: e.target.value})}
        required
      />
      
      <Textarea
        label="Description"
        value={jobData.description}
        onChange={e => setJobData({...jobData, description: e.target.value})}
        required
      />
      
      <Select
        label="Trade"
        value={jobData.trade}
        onChange={e => setJobData({...jobData, trade: e.target.value})}
        options={['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Painting', 'Roofing']}
        required
      />
      
      <Input
        label="ZIP Code"
        value={jobData.zip_code}
        onChange={e => setJobData({...jobData, zip_code: e.target.value})}
        pattern="[0-9]{5}"
        required
      />
      
      <div className="flex gap-4">
        <Input
          label="Budget Min ($)"
          type="number"
          value={jobData.budget_min}
          onChange={e => setJobData({...jobData, budget_min: e.target.value})}
          required
        />
        <Input
          label="Budget Max ($)"
          type="number"
          value={jobData.budget_max}
          onChange={e => setJobData({...jobData, budget_max: e.target.value})}
          required
        />
      </div>
      
      <Button type="submit">
        Post Job - $25
      </Button>
    </form>
  );
}
```

## 4. ProfileForm

Contractor signup/profile edit form.

```tsx
// components/forms/ProfileForm.tsx
export function ProfileForm({ mode }: { mode: 'create' | 'edit' }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    license_number: '',
    trade: '',
    bio: '',
    zip_code: '',
    photos: [] as string[]
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 1. Create auth user (if signup)
    if (mode === 'create') {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { type: 'contractor' }
        }
      });
    }

    // 2. Upload photos to Supabase Storage
    const photoUrls = await Promise.all(
      formData.photos.map(async (file) => {
        const { data } = await supabase.storage
          .from('contractor-photos')
          .upload(`${user.id}/${file.name}`, file);
        return data?.path;
      })
    );

    // 3. Save profile
    await supabase.from('contractors').upsert({
      profile_id: user.id,
      ...formData,
      photos: photoUrls,
      is_approved: false // Admin approval required
    });

    router.push('/contractors/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Full Name" required />
      <Input label="Phone" type="tel" required />
      <Input label="License Number" required />
      <Select 
        label="Trade" 
        options={['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Painting']}
        required 
      />
      <Textarea label="Bio" maxLength={500} />
      <Input label="ZIP Code" pattern="[0-9]{5}" required />
      
      <FileUpload
        label="Work Photos (up to 5)"
        accept="image/*"
        multiple
        maxFiles={5}
        onUpload={(files) => setFormData({...formData, photos: files})}
      />
      
      <Button type="submit">
        {mode === 'create' ? 'Create Profile' : 'Save Changes'}
      </Button>
    </form>
  );
}
```

## 5. ExpressInterestButton

Simple "apply" button for contractors.

```tsx
// components/ExpressInterestButton.tsx
interface ExpressInterestButtonProps {
  jobId: string;
  hasApplied: boolean;
}

export function ExpressInterestButton({ jobId, hasApplied }: ExpressInterestButtonProps) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(hasApplied);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleExpressInterest = async () => {
    if (!showMessage) {
      setShowMessage(true);
      return;
    }

    setLoading(true);
    
    const { error } = await fetch(`/api/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });

    if (!error) {
      setApplied(true);
    }
    
    setLoading(false);
  };

  if (applied) {
    return <Badge variant="success">Interest Expressed</Badge>;
  }

  return (
    <div>
      {showMessage && (
        <Textarea
          placeholder="Optional message to homeowner..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          maxLength={500}
        />
      )}
      <Button 
        onClick={handleExpressInterest}
        loading={loading}
      >
        {showMessage ? 'Submit Interest' : 'Express Interest'}
      </Button>
    </div>
  );
}
```

## 6. HomeownerSignupForm

```tsx
// components/forms/HomeownerSignupForm.tsx
export function HomeownerSignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          type: 'homeowner',
          full_name: fullName
        }
      }
    });

    if (data.user) {
      // Create profile record
      await supabase.from('profiles').insert({
        id: data.user.id,
        type: 'homeowner',
        full_name: fullName,
        phone
      });

      router.push('/homeowners/post-job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input label="Phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
      <Button type="submit">Sign Up & Post Job</Button>
    </form>
  );
}
```
