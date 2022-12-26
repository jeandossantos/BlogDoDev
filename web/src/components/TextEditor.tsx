import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface TextEditorProps {
  placeholder: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export function TextEditor({
  placeholder,
  content,
  setContent,
}: TextEditorProps) {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: placeholder || 'Start typings...',
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={{ ...config }}
      // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
}
