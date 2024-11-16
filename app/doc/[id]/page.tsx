'use client';
import React from 'react'; // Ensure React is imported if you're using `React.use`

import Document from "@/components/Document";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); 

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
