import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type DefaultValues, type FieldValues, type Path } from 'react-hook-form';
import type { ZodType } from 'zod';
import { ApiError } from '@/api/http';
import { useSubmitForm, type FormName } from '@/api/queries';

type Feedback = { type: 'success' | 'error'; text: string } | null;

// react-hook-form + zod + API mutation, with server-side field errors mapped back
export function useSiteForm<T extends FieldValues>(
  name: FormName,
  schema: ZodType<T, T>,
  defaults: DefaultValues<T>,
) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: 'onTouched',
  });
  const mutation = useSubmitForm<T>(name);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const onSubmit = form.handleSubmit(async (values) => {
    setFeedback(null);
    try {
      const res = await mutation.mutateAsync(values);
      form.reset(defaults);
      setFeedback({ type: 'success', text: res.message });
    } catch (err) {
      if (err instanceof ApiError) {
        Object.entries(err.fields).forEach(([field, message]) =>
          form.setError(field as Path<T>, { message }),
        );
        setFeedback({ type: 'error', text: err.message });
      } else {
        setFeedback({
          type: 'error',
          text: 'Network error. Please check your connection and try again.',
        });
      }
    }
  });

  return { form, onSubmit, feedback, submitting: mutation.isPending };
}
