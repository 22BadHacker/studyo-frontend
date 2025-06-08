'use client';
import { useState } from 'react';

export default function CopyLinkButton({ role, publicId }) {
  const [copied, setCopied] = useState(false);

  const profileUrl = `${window.location.origin}/${role}/${publicId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className=" transition"
    >
      {copied ? 'Link Copied!' : 'Copy Profile Link'}
    </button>
  );
}
