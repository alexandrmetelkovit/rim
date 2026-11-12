import { useTranslation } from 'react-i18next';
import './ErrorFallback.scss';

interface ErrorFallbackProps {
  messageKey?: string;
}

export const ErrorFallback = ({ messageKey }: ErrorFallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className='error-fallback'>
      <p>
        ⚠️ {messageKey ? t(messageKey) : t('errorBoundaryFallback.default')}
      </p>
      <button onClick={() => window.location.reload()}>
        {t('errorBoundaryFallback.reload')}
      </button>
    </div>
  );
};
