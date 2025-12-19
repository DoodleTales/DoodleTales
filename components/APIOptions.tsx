'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { GameClientProps } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save, Trash2, ExternalLink, TriangleAlert } from 'lucide-react';
import { deleteAPIKey, getUserData, saveAPIKey, deleteUser, hasUserKey } from '@/app/api-options/page';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/app/game/actions';
import { useTheme } from '@/app/context/themeContext';

export default function APIOptions({ user }: GameClientProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  //* Reset theme on mount
  useEffect(() => {
    if (theme.theme !== '') {
      theme.setTheme('');
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await saveAPIKey(apiKey);
      setHasKey(true);
      setIsLoading(false);
      setApiKey('');
      toast.custom((t) => (
        <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>API key successfully saved!</div>
              <div className='text-sm opacity-90'>You can now use your API key.</div>
            </div>
          </div>
        </div>
      ));
      router.replace('/theme-provider');
    } catch (error) {
      toast.custom((t) => (
        <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>Failed to save the API key!</div>
              <div className='text-sm opacity-90'>Please try again.</div>
            </div>
          </div>
        </div>
      ));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await saveAPIKey(apiKey);
      setHasKey(true);
      setIsLoading(false);
      setApiKey('');
      toast.custom((t) => (
        <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>API key successfully updated!</div>
              <div className='text-sm opacity-90'>You can now use your API key.</div>
            </div>
          </div>
        </div>
      ));
      router.replace('/theme-provider');
    } catch (error) {
      toast.custom((t) => (
        <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>Failed to update the API key!</div>
              <div className='text-sm opacity-90'>Please try again.</div>
            </div>
          </div>
        </div>
      ));
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your API Key?')) {
      setIsLoading(true);
      try {
        await deleteAPIKey();
        setHasKey(false);
        setIsLoading(false);
        toast.custom((t) => (
          <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
            <div className='flex items-center gap-2'>
              <div>
                <div className='font-semibold'>API key successfully deleted!</div>
                <div className='text-sm opacity-90'>You can now add an API key.</div>
              </div>
            </div>
          </div>
        ));
        setApiKey('');
      } catch (error) {
        toast.custom((t) => (
          <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
            <div className='flex items-center gap-2'>
              <div>
                <div className='font-semibold'>Failed to delete the API key!</div>
                <div className='text-sm opacity-90'>Please try again.</div>
              </div>
            </div>
          </div>
        ));
      }
    }
  };

  const handleDeleteUser = async () => {
    if (confirm('Are you sure you want to delete your Account? This action cannot be undone.')) {
      setIsLoading(true);
      let success = false;
      try {
        await deleteUser();
        success = true;
      } catch (error) {
        // console.error(error);
        setIsLoading(false);
        toast.custom((t) => (
          <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
            <div className='flex items-center gap-2'>
              <div>
                <div className='font-semibold'>Failed to delete account!</div>
                <div className='text-sm opacity-90'>Please try again.</div>
              </div>
            </div>
          </div>
        ));
      }

      if (success) {
        await handleSignOut();
      }
    }
  };

  useEffect(() => {
    const checkKey = async () => {
      const hasKey = await hasUserKey();
      if (hasKey) {
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  return (
    <div className='fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground'>
      <Navbar isAuthenticated={true} user={user} isAPIOptionsDisabled={true} hasKey={hasKey} />
      <div className='p-8 flex flex-col flex-1 min-h-0'>
        <div className='flex-1 min-h-0 mt-4 flex flex-col-reverse lg:flex-row gap-4'>

          {/* Instructions Panel */}
          <section className='flex-1 min-w-[400px] border rounded-lg overflow-auto shadow-sm bg-card p-6 flex flex-col gap-4 relative'>
            <div>
              <h2 className='text-2xl font-bold mb-4 text-center'>Getting Started with Google AI</h2>
              <div className='aspect-video relative w-full mb-4 rounded-lg overflow-hidden border bg-muted'>
                <iframe
                  className='absolute inset-0 w-full h-full'
                  src='https://www.youtube.com/embed/RVGbLSVFtIk'
                  title='Google AI API Key Tutorial'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>

              <div className='prose dark:prose-invert max-w-none space-y-4'>
                <p>
                  To unlock image generation features, you need a Google AI API Key.
                  Follow these steps to obtain one:
                </p>
                <ol className='list-decimal pl-4 space-y-2'>
                  <li>
                    Go to <a href='https://aistudio.google.com/' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline inline-flex items-center gap-1'>Google AI Studio <ExternalLink className='h-3 w-3' /></a>.
                  </li>
                  <li>
                    Click Get API key in the left sidebar.
                  </li>
                  <li>
                    Click Create API key project.
                  </li>
                  <li>
                    Copy the generated key and paste it in the panel to the right.
                  </li>
                </ol>
                <TriangleAlert className='h-4 w-4 inline text-red-500' /> Ensure billing is enabled for your Google Cloud project associated with the API key.
              </div>
            </div>
          </section>

          {/* API Key Management Panel */}
          <section className='flex-1 min-w-[400px] border rounded-lg overflow-auto shadow-sm bg-card p-6 flex flex-col relative justify-center items-center'>
            <div className='w-full max-w-md space-y-6'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold'>Account Management</h2>
                <p className='text-muted-foreground'>
                  Manage your Google AI API key securely 🔑
                </p>
              </div>

              <div className='space-y-6 border p-6 rounded-lg bg-muted/20'>
                {hasKey ? (
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 bg-background border rounded-md'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-green-500'></div>
                        <span className='font-medium'>API Key Active</span>
                      </div>
                      <span className='text-xs text-muted-foreground'>••••••••••••</span>
                    </div>

                    <form onSubmit={handleUpdate} className='space-y-4 pt-4 border-t'>
                      <div className='space-y-2'>
                        <Label htmlFor='update-key'>Update API Key</Label>
                        <div className='relative'>
                          <Input
                            id='update-key'
                            type={showKey ? 'text' : 'password'}
                            placeholder='Paste new API key here'
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            autoComplete='off'
                            required
                          />
                          {apiKey &&
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                              onClick={() => setShowKey(!showKey)}
                            >
                              {showKey ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                            </Button>
                          }
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button type='submit' className='flex-1 cursor-pointer' disabled={isLoading}>
                          {isLoading ? 'Updating...' : 'Update Key'}
                        </Button>
                        <Button type='button' variant='destructive' onClick={handleDelete} disabled={isLoading} className='cursor-pointer'>
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='api-key'>Enter your API Key</Label>
                      <div className='relative'>
                        <Input
                          id='api-key'
                          type={showKey ? 'text' : 'password'}
                          placeholder='AIzaSy...'
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          autoComplete='off'
                          required
                        />
                        {apiKey &&
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer'
                            onClick={() => setShowKey(!showKey)}
                          >
                            {showKey ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                          </Button>
                        }
                      </div>
                    </div>
                    <Button type='submit' className='w-full cursor-pointer' disabled={isLoading}>
                      <Save className='h-4 w-4 mr-2' />
                      {isLoading ? 'Saving...' : 'Save API Key'}
                    </Button>
                  </form>
                )}
              </div>

              <div className='border p-6 rounded-lg bg-red-500/10 flex flex-col gap-4'>
                <div className='flex items-center gap-2 text-red-600'>
                  <TriangleAlert className='h-5 w-5' />
                  <span className='font-semibold'>Danger Zone</span>
                </div>
                <p className='text-sm text-red-600/80'>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant='destructive'
                  onClick={handleDeleteUser}
                  disabled={isLoading}
                  className='w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white border border-white'
                >
                  <Trash2 className='h-4 w-4 mr-2' />
                  Delete Account
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
