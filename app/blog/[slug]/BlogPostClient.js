"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import styles from '../../info.module.css';

export default function BlogPostClient({ post }) {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    if (post?.content) {
      setSanitizedContent(DOMPurify.sanitize(post.content));
    }
  }, [post]);

  if (!post) return <div style={{ textAlign: 'center', padding: '10rem' }}>Post not found.</div>;

  return (
    <main className={styles.page}>
      <div className={styles.hero} style={{ paddingBottom: '8rem' }}>
        <Link href="/blog" className={styles.heroBadge} style={{ cursor: 'pointer' }}>
          ← Back to Blog
        </Link>
        <span className={styles.blogTag} style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '1rem' }}>
          {post.tag}
        </span>
        <h1 style={{ maxWidth: '900px', margin: '0 auto' }}>{post.title}</h1>
        <div style={{ marginTop: '2rem', opacity: 0.8, fontSize: '0.9rem' }}>
          {new Date(post.createdAt).toLocaleDateString()} · By {post.author?.name}
        </div>
      </div>

      <div className={styles.container} style={{ marginTop: '-4rem', background: '#fff', borderRadius: '16px', padding: '3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <img 
          src={post.image} 
          alt={post.title} 
          style={{ width: '100%', borderRadius: '8px', marginBottom: '3rem', maxHeight: '500px', objectFit: 'cover' }} 
        />
        <div 
          className={styles.prose} 
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          style={{ fontSize: '1.125rem', lineHeight: '1.8' }}
        />
        
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <h3>Share this Story</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <span style={{ cursor: 'pointer', opacity: 0.6 }}>Facebook</span>
            <span style={{ cursor: 'pointer', opacity: 0.6 }}>Twitter</span>
            <span style={{ cursor: 'pointer', opacity: 0.6 }}>WhatsApp</span>
          </div>
        </div>
      </div>
    </main>
  );
}
