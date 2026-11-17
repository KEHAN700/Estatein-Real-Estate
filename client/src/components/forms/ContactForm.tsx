import { Field, Input, Select, Textarea } from '@/components/form/fields';
import { FormShell } from '@/components/form/FormShell';
import { contactSchema } from '@/components/form/schemas';
import { useSiteForm } from '@/components/form/useSiteForm';
import { inquiryTypes, referralSources } from '@/lib/options';
import s from './forms.module.scss';

export function ContactForm() {
  const { form, onSubmit, feedback, submitting } = useSiteForm('contact', contactSchema, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    source: '',
    message: '',
    agree: false,
  });
  const { register, formState: { errors } } = form;

  return (
    <FormShell
      onSubmit={onSubmit}
      submitting={submitting}
      feedback={feedback}
      agreeProps={register('agree')}
      agreeError={errors.agree?.message}
    >
      <Field label="First Name" error={errors.firstName?.message} className={s.third}>
        {(id) => <Input id={id} placeholder="Enter First Name" autoComplete="given-name" invalid={!!errors.firstName} {...register('firstName')} />}
      </Field>
      <Field label="Last Name" error={errors.lastName?.message} className={s.third}>
        {(id) => <Input id={id} placeholder="Enter Last Name" autoComplete="family-name" invalid={!!errors.lastName} {...register('lastName')} />}
      </Field>
      <Field label="Email" error={errors.email?.message} className={s.third}>
        {(id) => <Input id={id} type="email" placeholder="Enter your Email" autoComplete="email" invalid={!!errors.email} {...register('email')} />}
      </Field>
      <Field label="Phone" error={errors.phone?.message} className={s.third}>
        {(id) => <Input id={id} type="tel" placeholder="Enter Phone Number" autoComplete="tel" invalid={!!errors.phone} {...register('phone')} />}
      </Field>
      <Field label="Inquiry Type" error={errors.inquiryType?.message} className={s.third}>
        {(id) => <Select id={id} placeholder="Select Inquiry Type" options={inquiryTypes} invalid={!!errors.inquiryType} {...register('inquiryType')} />}
      </Field>
      <Field label="How Did You Hear About Us?" error={errors.source?.message} className={s.third}>
        {(id) => <Select id={id} placeholder="Select" options={referralSources} invalid={!!errors.source} {...register('source')} />}
      </Field>
      <Field label="Message" error={errors.message?.message} className={s.full}>
        {(id) => <Textarea id={id} placeholder="Enter your Message here.." invalid={!!errors.message} {...register('message')} />}
      </Field>
    </FormShell>
  );
}
