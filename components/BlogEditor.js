"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, 
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code, Upload
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import styles from './BlogEditor.module.css';

const BlogEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    immediatelyRender: false,
    content: content || '<p>Start writing your heritage story...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.isActive : ''}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.isActive : ''}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 1 }) ? styles.isActive : ''}`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 2 }) ? styles.isActive : ''}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 0.5rem' }} />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.isActive : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.isActive : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${styles.toolbarButton} ${editor.isActive('blockquote') ? styles.isActive : ''}`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${styles.toolbarButton} ${editor.isActive('code') ? styles.isActive : ''}`}
          title="Code"
        >
          <Code size={18} />
        </button>
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 0.5rem' }} />
        <button onClick={addLink} className={styles.toolbarButton} title="Add Link">
          <LinkIcon size={18} />
        </button>
        <div className={styles.toolbarButton} style={{ position: 'relative' }} title="Upload Image">
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const formData = new FormData();
                formData.append('image', file);
                try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  });
                  const data = await res.json();
                  if (data.success) {
                    editor.chain().focus().setImage({ src: data.url }).run();
                  }
                } catch (err) {
                  console.error('Upload failed', err);
                }
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer',
              zIndex: 2,
            }}
          />
          <Upload size={18} />
        </div>
        <button onClick={addImage} className={styles.toolbarButton} title="Add Image via URL">
          <ImageIcon size={18} />
        </button>
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 0.5rem' }} />
        <button onClick={() => editor.chain().focus().undo().run()} className={styles.toolbarButton} title="Undo">
          <Undo size={18} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className={styles.toolbarButton} title="Redo">
          <Redo size={18} />
        </button>
      </div>
      <EditorContent editor={editor} className={styles.content} />
    </div>
  );
};

export default BlogEditor;
