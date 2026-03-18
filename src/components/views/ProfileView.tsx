'use client';

import ViewShell from '@/components/ui/ViewShell';
import HologramProfile from '@/components/terminal/HologramProfile';

interface ProfileViewProps {
  onBack: () => void;
}

export default function ProfileView({ onBack }: ProfileViewProps) {
  return (
    <ViewShell title="Profile" subtitle="// Identity Resolved" onBack={onBack}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <HologramProfile />
      </div>
    </ViewShell>
  );
}
