import { toast } from 'sonner';

export function serverErrorToast(onRetry: () => void, title: string, message: string, options?: boolean) {
  return (
    toast.custom((t) => (
      <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>☁️⚠️ {title}</div>
              <div className='text-sm opacity-90'>{message}</div>
            </div>
          </div>
          {options && (
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  toast.dismiss(t);
                  onRetry();
                }}
                className='bg-white text-orange-600 px-4 py-2 rounded-md font-semibold hover:bg-orange-50 transition-colors'
              >
                Retry
              </button>
              <button
                onClick={() => toast.dismiss(t)}
                className='bg-transparent border border-white text-white px-4 py-2 rounded-md font-semibold hover:bg-white/10 transition-colors'
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    ));
}

export function clientErrorToast(onRetry: () => void, title: string, message: string, options?: boolean) {
  return (
    toast.custom((t) => (
      <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>💻⚠️ {title}</div>
              <div className='text-sm opacity-90'>{message}</div>
            </div>
          </div>
          {options && (
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  toast.dismiss(t);
                  onRetry();
                }}
                className='bg-white text-orange-600 px-4 py-2 rounded-md font-semibold hover:bg-orange-50 transition-colors'
              >
                Try Again
              </button>
              <button
                onClick={() => toast.dismiss(t)}
                className='bg-transparent border border-white text-white px-4 py-2 rounded-md font-semibold hover:bg-white/10 transition-colors'
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    ));
}