import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('next/link', () => {
  return ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);
