import React from 'react';
import { StorefrontHeader } from '@/components/ui/storefront-header';
import { StorefrontFooter } from '@/components/ui/storefront-footer';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <StorefrontHeader />
      <main className="flex-1">{children}</main>
      <StorefrontFooter />
    </div>
  );
}
