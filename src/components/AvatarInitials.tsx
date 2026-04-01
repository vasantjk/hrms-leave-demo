import { twMerge } from 'tailwind-merge';

type ReferrerPolicyValue =
  | 'no-referrer'
  | 'origin'
  | 'unsafe-url'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin';

interface Props {
  name: string;
  initials?: string;
  avatar?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  fallbackClassName?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  referrerPolicy?: ReferrerPolicyValue;
}

const getInitials = (name: string) =>
  name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function AvatarInitials({
  name,
  initials,
  avatar,
  alt,
  className,
  imgClassName,
  fallbackClassName,
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer',
}: Props) {
  const resolvedAlt = alt ?? name;
  const resolvedInitials = (initials ?? getInitials(name)).toUpperCase();

  return (
    <div
      className={twMerge(
        'flex items-center justify-center overflow-hidden aspect-square shrink-0',
        className,
      )}
      aria-label={resolvedAlt}
    >
      {avatar ? (
        <img
          alt={resolvedAlt}
          className={twMerge('w-full h-full object-cover', imgClassName)}
          src={avatar}
          referrerPolicy={referrerPolicy}
          loading={loading}
          decoding={decoding}
        />
      ) : (
        <span className={twMerge('font-bold', fallbackClassName)}>
          {resolvedInitials}
        </span>
      )}
    </div>
  );
}
