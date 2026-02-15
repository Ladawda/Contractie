# Contractie - Free Libraries & Dependencies

Complete list of free, open-source libraries to use with shadcn/ui for Contractie.

## Essential Libraries

### Core (Install First)
```bash
npm install @tanstack/react-query react-hook-form zod @hookform/resolvers
npm install date-fns framer-motion sonner
npm install embla-carousel-react react-dropzone
npm install @tanstack/react-table cmdk
```

---

## UI Components

### TanStack Table
**Purpose**: Data tables with sorting, filtering, pagination  
**Use in Contractie**: Job listings table, contractor list, admin dashboard  
**Install**: `npm install @tanstack/react-table`  
**Docs**: https://tanstack.com/table/latest

```tsx
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

// For job listings, contractor directory
```

### React Hook Form + Zod
**Purpose**: Form handling with TypeScript validation  
**Use in Contractie**: Job post form, contractor signup, profile editing  
**Install**: `npm install react-hook-form zod @hookform/resolvers`  
**Docs**: https://react-hook-form.com/

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
})
```

### Embla Carousel
**Purpose**: Touch-friendly carousels  
**Use in Contractie**: Contractor photo gallery, past job portfolio  
**Install**: `npm install embla-carousel-react`  
**Docs**: https://www.embla-carousel.com/

```tsx
import useEmblaCarousel from 'embla-carousel-react'

// For contractor photo galleries
```

### React Dropzone
**Purpose**: Drag & drop file uploads  
**Use in Contractie**: Contractor photo uploads, license document upload  
**Install**: `npm install react-dropzone`  
**Docs**: https://react-dropzone.js.org/

```tsx
import { useDropzone } from 'react-dropzone'

// Drag and drop for photos
```

### React Select
**Purpose**: Better dropdowns with search  
**Use in Contractie**: Trade selection, location picker  
**Install**: `npm install react-select`  
**Docs**: https://react-select.com/

### Cmdk
**Purpose**: Command palette / search interface  
**Use in Contractie**: Quick search jobs, contractors  
**Install**: `npm install cmdk`  
**Docs**: https://cmdk.paco.me/

---

## State Management & Data Fetching

### TanStack Query (React Query)
**Purpose**: Server state management, caching, background updates  
**Use in Contractie**: Fetch jobs, contractors, user data  
**Install**: `npm install @tanstack/react-query`  
**Docs**: https://tanstack.com/query/latest

```tsx
import { useQuery, useMutation } from '@tanstack/react-query'

// Fetch jobs
const { data: jobs } = useQuery({
  queryKey: ['jobs'],
  queryFn: fetchJobs
})
```

### Zustand (Optional)
**Purpose**: Client state management  
**Use in Contractie**: UI state, filters, modals  
**Install**: `npm install zustand`  
**Docs**: https://github.com/pmndrs/zustand

---

## Animation & Visual

### Framer Motion
**Purpose**: Animations, page transitions, gestures  
**Use in Contractie**: Page transitions, modal animations, list animations  
**Install**: `npm install framer-motion`  
**Docs**: https://www.framer.com/motion/

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
```

### AutoAnimate
**Purpose**: Simple list animations (zero config)  
**Use in Contractie**: Job list updates, contractor list  
**Install**: `npm install @formkit/auto-animate`  
**Docs**: https://auto-animate.formkit.com/

```tsx
import { useAutoAnimate } from '@formkit/auto-animate/react'

const [parent] = useAutoAnimate()
<ul ref={parent}>
  {jobs.map(job => <li key={job.id}>{job.title}</li>)}
</ul>
```

### React Spring
**Purpose**: Physics-based animations  
**Use in Contractie**: Advanced animations  
**Install**: `npm install @react-spring/web`  
**Docs**: https://www.react-spring.dev/

### Lottie React
**Purpose**: Animated icons and illustrations  
**Use in Contractie**: Empty states, success animations  
**Install**: `npm install lottie-react`  
**Docs**: https://lottiereact.com/

---

## Notifications & Feedback

### Sonner
**Purpose**: Toast notifications (matches shadcn style)  
**Use in Contractie**: Success messages, error alerts  
**Install**: `npm install sonner`  
**Docs**: https://sonner.emilkowal.ski/

```tsx
import { toast } from 'sonner'

toast.success('Job posted successfully!')
toast.error('Something went wrong')
```

### React Hot Toast (Alternative)
**Purpose**: Toast notifications  
**Install**: `npm install react-hot-toast`  
**Docs**: https://react-hot-toast.com/

### NProgress
**Purpose**: Page load progress bar  
**Use in Contractie**: Show loading during navigation  
**Install**: `npm install nprogress`  
**Docs**: https://ricostacruz.com/nprogress/

---

## Utilities

### Date-fns
**Purpose**: Date formatting and manipulation  
**Use in Contractie**: "Posted 2 days ago", job deadlines  
**Install**: `npm install date-fns`  
**Docs**: https://date-fns.org/

```tsx
import { formatDistanceToNow } from 'date-fns'

formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
// "2 days ago"
```

### React Phone Number Input
**Purpose**: Phone input with country flags  
**Use in Contractie**: Contractor phone numbers  
**Install**: `npm install react-phone-number-input`  
**Docs**: https://www.npmjs.com/package/react-phone-number-input

### React Textarea Autosize
**Purpose**: Auto-expanding textareas  
**Use in Contractie**: Job description input  
**Install**: `npm install react-textarea-autosize`  
**Docs**: https://github.com/Andarist/react-textarea-autosize

### Usehooks-ts
**Purpose**: Useful React hooks  
**Use in Contractie**: useLocalStorage, useDebounce, useOnClickOutside  
**Install**: `npm install usehooks-ts`  
**Docs**: https://usehooks-ts.com/

### clsx + tailwind-merge
**Purpose**: Conditional class names  
**Status**: Already included with shadcn  
**Usage**:
```tsx
import { cn } from '@/lib/utils'

className={cn('base-class', isActive && 'active-class')}
```

---

## Maps & Location

### React Leaflet
**Purpose**: Interactive maps (OpenStreetMap, free)  
**Use in Contractie**: Show contractor service areas  
**Install**: `npm install react-leaflet leaflet`  
**Docs**: https://react-leaflet.js.org/

### Google Maps React (Alternative)
**Purpose**: Google Maps integration  
**Note**: Requires Google API key (free tier available)  
**Install**: `npm install @react-google-maps/api`  
**Docs**: https://react-google-maps-api-docs.netlify.app/

---

## Charts (For Future Analytics Dashboard)

### Recharts
**Purpose**: Simple React charts  
**Use in Contractie**: Admin analytics, job posting trends  
**Install**: `npm install recharts`  
**Docs**: https://recharts.org/

### Tremor
**Purpose**: Dashboard components with charts  
**Use in Contractie**: Admin dashboard  
**Install**: `npm install @tremor/react`  
**Docs**: https://www.tremor.so/

---

## SEO & Meta

### Next SEO
**Purpose**: SEO management for Next.js  
**Use in Contractie**: Page titles, meta tags, Open Graph  
**Install**: `npm install next-seo`  
**Docs**: https://github.com/garmeeh/next-seo

```tsx
import { NextSeo } from 'next-seo'

<NextSeo
  title="Find a Contractor | Contractie"
  description="Connect with verified local contractors"
/>
```

---

## Testing (Development)

### Vitest
**Purpose**: Unit testing  
**Install**: `npm install -D vitest`  
**Docs**: https://vitest.dev/

### React Testing Library
**Purpose**: Component testing  
**Install**: `npm install -D @testing-library/react @testing-library/jest-dom`  
**Docs**: https://testing-library.com/docs/react-testing-library/intro/

### Playwright
**Purpose**: End-to-end testing  
**Install**: `npm install -D @playwright/test`  
**Docs**: https://playwright.dev/

---

## Complete Install Command

```bash
# Essential for Contractie
npm install @tanstack/react-query react-hook-form zod @hookform/resolvers
npm install date-fns framer-motion sonner
npm install embla-carousel-react react-dropzone
npm install @tanstack/react-table cmdk
npm install usehooks-ts

# Optional but recommended
npm install @formkit/auto-animate
npm install react-phone-number-input
npm install react-textarea-autosize
npm install next-seo

# For maps (choose one)
npm install react-leaflet leaflet
# OR
npm install @react-google-maps/api

# For future analytics
npm install recharts
# OR
npm install @tremor/react

# Dev dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

## Library Selection Guide

### MVP (Week 1)
**Must-have:**
- @tanstack/react-query
- react-hook-form + zod
- date-fns
- framer-motion
- sonner
- embla-carousel-react
- react-dropzone

### Nice-to-have (Week 2+)
- @tanstack/react-table
- cmdk
- @formkit/auto-animate
- react-phone-number-input
- recharts

### Future Features
- react-leaflet (maps)
- @tremor/react (analytics)
- lottie-react (animations)

---

## License Notes

All libraries listed are:
- ✅ Open source
- ✅ Free for commercial use
- ✅ MIT or Apache 2.0 license

Always verify license before use.

---

## Updates

Check for updates monthly:
```bash
npm outdated
npm update
```

---

See also:
- `STARTER_TEMPLATE.md` - Recommended starter template
- `TECH_STACK_MVP.md` - Core technology choices
