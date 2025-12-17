'use client';

import { useRef, useState } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import Navbar from './Navbar';
import SketchCanvas from '@/components/SketchCanvas';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { GameClientProps } from '@/lib/types';
import { useGame } from '@/app/hooks/use-game';
import { FaPaperPlane } from 'react-icons/fa';
import { Pen, Eraser, Palette, Trash } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import { useTheme } from '@/app/context/themeContext';
import ChatGame from '@/components/ChatGame';

const COLORS = [
  '#000000',
  '#ef4444',
  '#3b82f6',
  '#22c55e',
  '#eab308',
];

export default function Game({ user }: GameClientProps) {
  const {title, messages, isLoading, submitImage } = useGame();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#555555');
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(10);
  const [sendFailed, setSendFailed] = useState(false);
  const { theme } = useTheme();

  if (!theme || Array.isArray(theme)) {
    redirect('/theme-provider');
  }

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleColorClick = (color: string) => {
    setStrokeColor(color);
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleSend = async () => {
    if (canvasRef.current) {
      try {
        const paths = await canvasRef.current.exportPaths();
        if (paths.length === 0) {
          console.error('No paths found 🖌️ ❌');
          setSendFailed(true);
          // Reset after animation completes (500ms)
          setTimeout(() => setSendFailed(false), 500);
          return;
        } else {
          const image = await canvasRef.current.exportImage('png');

          //TODO Avoid showing the image directly in the chat view, we need to process it first and show the AI processed image
          const base64Data = image.replace(/^data:image\/png;base64,/, '');
          console.log(base64Data);
          await submitImage(base64Data);
          canvasRef.current.clearCanvas();
        }
      } catch (error) {
        console.error('Error exporting image 🖼️ ❌:', error);
      }
    }
  };

  return (
    <div className='fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground'>
      <Navbar isAuthenticated={true} user={user}/>
      <div className='p-8 flex flex-col flex-1 min-h-0'>
        <div className='flex-1 min-h-0 mt-4 flex flex-col-reverse xl:flex-row gap-4'>
          {/* chatGame Section */}
          <section className='flex-1 min-w-[600px] border rounded-xl overflow-hidden shadow-sm bg-card relative'>
            <ChatGame title={title} messages={messages} isLoading={isLoading} />
          </section>
          {/* SketchCanvas Section */}
          <section className='flex-1 min-w-[600px] border rounded-xl overflow-hidden shadow-sm bg-card relative flex flex-col'>
            <div className='p-4 border-b bg-muted/20 flex flex-col xl:flex-row gap-4 justify-between items-center'>
              <h2 className='text-lg font-semibold leading-none hidden xl:block'>Draw!</h2>

              {/* Toolbar */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center border rounded-lg overflow-hidden bg-background shadow-sm'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className={`h-8 w-8 rounded-none ${!eraseMode ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
                    onClick={handlePenClick}
                    title='Pen'
                  >
                    <Pen className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className={`h-8 w-8 rounded-none ${eraseMode ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
                    onClick={handleEraserClick}
                    title='Eraser'
                  >
                    <Eraser className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className={'h-8 w-8 rounded-none'}
                    onClick={handleClearClick}
                    title='Clear'
                  >
                    <Trash className='h-4 w-4' />
                  </Button>
                </div>

                <div className='w-px h-6 bg-border mx-1' />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 rounded-none'
                      title='Color Picker'
                    >
                      <Palette className='h-4 w-4' style={{ color: !eraseMode ? strokeColor : undefined }} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-64 p-3'>
                    <div className='grid gap-4'>
                      <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>Color Palette</h4>
                        <p className='text-sm text-muted-foreground'>
                          Pick a color for your brush.
                        </p>
                      </div>
                      <div className='grid grid-cols-6 gap-2'>
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border border-border transition-all ${strokeColor === color ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className='flex items-center gap-2 pt-2 border-t'>
                        <label htmlFor='custom-color' className='text-sm font-medium'>Custom:</label>
                        <input
                          type='color'
                          id='custom-color'
                          value={strokeColor}
                          onChange={(e) => handleColorClick(e.target.value)}
                          className='h-8 w-full cursor-pointer'
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className='w-px h-6 bg-border mx-1' />

                <div className='flex items-center gap-2'>
                  <span className='text-xs font-medium text-muted-foreground w-4 text-center'>{strokeWidth}</span>
                  <input
                    type='range'
                    min='1'
                    max='100'
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                    className='w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary'
                    title='Brush Size'
                  />
                </div>
              </div>
              <Button
                key={sendFailed ? 'send-failed' : 'send-normal'}
                className={`${sendFailed ? 'animate-shake bg-red-600 hover:bg-red-600 text-white' : ''}`}
                onClick={handleSend}
                disabled={isLoading}
              >
                Send <FaPaperPlane />
              </Button>
            </div>
            <div className='flex-1 relative'>
              <SketchCanvas
                ref={canvasRef}
                width='100%'
                height='100%'
                canvasColor='transparent'
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                eraserWidth={strokeWidth}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
