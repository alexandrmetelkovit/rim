import './ErrorFallback.scss';

interface ErrorFallbackProps {
  message?: string;
}

export const ErrorFallback = ({ message }: ErrorFallbackProps) => {
  return (
    <div className='error-fallback'>
      <p>⚠️ {message}</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
};
