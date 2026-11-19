import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.scss';
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryInnerProps extends ErrorBoundaryProps {
  t: (key: string) => string;
}

class ErrorBoundaryInner extends Component<
  ErrorBoundaryInnerProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryInnerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='error-boundary'>
            <h2>{this.props.t('errorBoundary.title')}</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()}>
              {this.props.t('errorBoundary.reload')}
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundaryInner
      {...props}
      t={t}
    />
  );
};
