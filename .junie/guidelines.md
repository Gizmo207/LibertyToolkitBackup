# Liberty Toolkit AI Coding Guidelines

## Project Context
You are generating code for **Liberty Toolkit**, a React-based web application.  
Always follow these guidelines when writing code.

---

## Technology Stack Requirements
- **ALWAYS USE**: TypeScript, React 18+, Functional Components, React Hooks  
- **NEVER USE**: Class components, JavaScript (use TypeScript), inline styles  
- **STYLING**: TailwindCSS only — no other CSS frameworks  
- **FORMS**: React Hook Form + Zod validation  
- **HTTP**: Fetch API or Axios  
- **ICONS**: Lucide React or Heroicons only  

---

## Project Structure
```
src/
├── components/     # Reusable UI components
│   ├── common/     # Button, Input, Card, etc.
│   ├── forms/      # Form-specific components
│   ├── layout/     # Header, Footer, Sidebar
│   └── features/   # Feature-specific components
├── pages/          # Route-level components
├── hooks/          # Custom React hooks (prefix with 'use')
├── utils/          # Helper functions
├── services/       # API calls and external integrations
├── types/          # TypeScript type definitions
└── constants/      # App-wide constants
```

---

## Component Generation Rules
- Always use **functional components** with TypeScript props.  
- Always order sections: imports → props → state hooks → other hooks → useEffect → handlers → early returns → render.  
- Provide loading/error states in all async components.  

Example template:
```typescript
import React, { useState, useEffect } from 'react';
import type { ComponentProps } from '@/types';

interface ExampleProps {
  required: string;
  optional?: number;
  callback: (data: any) => void;
}

export const Example: React.FC<ExampleProps> = ({ required, optional, callback }) => {
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  if (!state) return <LoadingSpinner />;

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      {required}
    </div>
  );
};
```

---

## TailwindCSS Styling Rules
- Class order: Layout → Position → Spacing → Size → Typography → Colors → Borders → Effects → Transitions → States.  
- Always mobile-first responsive design.  
- Example:
```tsx
<div className="flex items-center justify-between p-4 w-full bg-white rounded-lg shadow-md transition-all hover:shadow-lg" />
```

---

## Form Implementation Rules
- Always use **React Hook Form + Zod**.  
- Always disable submit button until valid.  
- Always handle `isSubmitting` and `errors`.

Example:
```typescript
const formSchema = z.object({
  email: z.string().email(),
  codeOfConduct: z.literal(true, { errorMap: () => ({ message: 'You must accept the Code of Conduct' }) })
});

type FormData = z.infer<typeof formSchema>;

const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<FormData>({
  resolver: zodResolver(formSchema),
  mode: 'onChange'
});
```

---

## API Integration Pattern
- Always define API calls in `services/`.  
- Always use env vars (`import.meta.env`).  
- Always handle errors and loading.

```typescript
const API_URL = import.meta.env.VITE_API_URL;

export const rosterApi = {
  submit: async (data: RosterData) => {
    const response = await fetch(`${API_URL}/roster`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }
};
```

---

## State Management
- Local state: `useState` for UI only.  
- Context: Typed context + custom hook wrappers.  
- No Redux unless explicitly required.  

---

## Error Handling
- Always use Error Boundaries at page level.  
- Always wrap async calls with try/catch.  
- Always give user-friendly error messages.  

---

## Security Rules
- ❌ Never hardcode API keys or URLs.  
- ❌ Never use `dangerouslySetInnerHTML` with user input.  
- ❌ Never store secrets in localStorage.  
- ✅ Always use env vars and server-side storage.  
- ✅ Always sanitize user input.  

---

## Performance Optimization
- Always use stable keys in lists.  
- Always lazy-load routes.  
- Always memoize expensive operations.  

---

## TypeScript Rules
- ❌ Never use `any`.  
- ✅ Always define types for props, responses, form data, and state.  
- ✅ Keep strict typing enabled.  

---

## File Naming
- Components → PascalCase.tsx  
- Hooks → useSomething.ts  
- Utils → camelCase.ts  
- Types → PascalCase.types.ts  
- Constants → UPPER_SNAKE_CASE.ts  

---

## Code Quality Checklist
Before generating code, always verify:
- [ ] TypeScript strict mode  
- [ ] Functional components only  
- [ ] No console.log in production  
- [ ] Tailwind classes in correct order  
- [ ] All async code has loading + error states  
- [ ] No hardcoded values  
- [ ] Responsive & accessible  

---

## Testing Rules
- Always use Vitest + React Testing Library.  
- Always test rendering, interactions, and props.  

---

## Liberty Toolkit Specific Rules
- 🚫 Do NOT generate Hamilton characters, mascots, or theatrical animations.  
- ✅ Primary focus is **Debate Cards + Join Form + Roster integration**.  

**Debate Cards**  
- Must flip to show more info.  
- Expanded view must use a **modal centered on screen**.  
- Each card must include: **Core Principles, Opposition Arguments, Counterpoints**.  
- Card content should come from a typed data source, not inline JSX.  

**Join Form**  
- Must always collect: Name, Email, Phone, Student ID, Why Join, Initials, Code of Conduct checkbox.  
- Submit button disabled until CoC is signed.  
- Always send to Google Apps Script endpoint.  

**Roster**  
- Never allow duplicate Student IDs.  
- Always sanitize inputs before submission.  

**AI Agent Behavior**  
- If unsure, ask clarifying questions before generating.  
- Always follow these guidelines even if user prompts suggest shortcuts.  

---

## Google Apps Script Integration
```typescript
const SCRIPT_URL = import.meta.env.VITE_GA_SCRIPT_URL;

const submitToGoogleSheet = async (data: FormData) => {
  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};
```
