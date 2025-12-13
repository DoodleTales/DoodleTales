'use client';

import { useZombieGame } from '@/app/hooks/use-zombie-game';

export default function ZombieGame() {
  const { messages, input, isLoading, startGame, handleSubmit, handleInputChange } = useZombieGame();

  return (
    <div>
      <h1>Zombie apocalypse game</h1>
    </div>
  );
}
