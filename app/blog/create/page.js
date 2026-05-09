"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import BlogEditor from '../../../components/BlogEditor';
import ImageUpload from '../../../components/ImageUpload';
import styles from '../../info.module.css';

export default function CreateBlogPage() {
  const { token, user } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Heritage');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      addToast('Please provide a title and content', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          tag,
          excerpt,
          content,
          image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        addToast(
          user.role === 'admin' 
            ? 'Story published successfully!' 
            : 'Story submitted for admin approval!', 
          'success'
        );
        router.push('/profile');
      } else {
        addToast(data.message, 'error');
      }
    } catch (err) {
      addToast('Failed to submit story', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      {/* ── CINEMATIC HEADER ── */}
      <div className={styles.hero} style={{ padding: '6rem 0 10rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
          <span className={styles.heroBadge}>Community Voice</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Write a Heritage Story
          </h1>
          <p className={styles.heroSub} style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Every thread has a history. Share yours with the TatiAssam community and help preserve our weaving legacy.
          </p>
        </div>
      </div>

      <div className={styles.container} style={{ marginTop: '-6rem', marginBottom: '8rem' }}>
        <form onSubmit={handleSubmit} style={{ 
          background: '#fff', 
          borderRadius: '24px', 
          padding: '4rem', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          
          {/* Section: Basic Info */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', borderLeft: '4px solid #394B3F', paddingLeft: '1rem' }}>
              The Foundation
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Story Title
              </label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Golden Threads of my Grandmother's Loom"
                style={{ 
                  width: '100%', 
                  padding: '1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  fontSize: '1.25rem', 
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#394B3F'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Category
                </label>
                <select 
                  value={tag} 
                  onChange={(e) => setTag(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '1.1rem', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0', 
                    fontSize: '1rem',
                    appearance: 'none',
                    background: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") no-repeat right 1rem center/1.2rem auto #fff'
                  }}
                >
                  <option value="Heritage">Heritage</option>
                  <option value="Style Guide">Style Guide</option>
                  <option value="Education">Education</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Festivals">Festivals</option>
                  <option value="Artisan Stories">Artisan Stories</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Featured Image
                </label>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '2px dashed #e2e8f0',
                  transition: 'all 0.2s'
                }}>
                  {!image ? (
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                      <ImageUpload 
                        onUploadSuccess={(url) => setImage(url)} 
                        multiple={false} 
                      />
                      <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                        Drag & drop or click to upload (1200x800 recommended)
                      </p>
                    </div>
                  ) : (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                      <img src={image} alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                        <button 
                          type="button" 
                          onClick={() => setImage('')} 
                          style={{ 
                            background: 'rgba(255,255,255,0.9)', 
                            color: '#dc2626', 
                            border: 'none', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '8px', 
                            fontSize: '0.8rem', 
                            fontWeight: '600', 
                            cursor: 'pointer',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>OR</span>
                    <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
                  </div>

                  <input 
                    type="text" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Paste a direct image URL..."
                    style={{ 
                      width: '100%', 
                      padding: '0.85rem 1rem', 
                      borderRadius: '10px', 
                      border: '1px solid #e2e8f0', 
                      fontSize: '0.9rem',
                      background: '#fff'
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Content */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', borderLeft: '4px solid #394B3F', paddingLeft: '1rem' }}>
              The Narrative
            </h2>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Brief Summary (Excerpt)
              </label>
              <textarea 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Hook your readers with a 2-sentence introduction..."
                rows={2}
                style={{ 
                  width: '100%', 
                  padding: '1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  fontSize: '1.1rem', 
                  resize: 'none',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  lineHeight: '1.6'
                }}
                onFocus={(e) => e.target.style.borderColor = '#394B3F'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                The Full Story
              </label>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <BlogEditor content={content} onChange={setContent} />
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                Tip: Use headings and images to make your story more engaging.
              </p>
            </div>
          </section>

          {/* Footer Actions */}
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            justifyContent: 'flex-end', 
            paddingTop: '3rem', 
            borderTop: '1px solid #f1f5f9' 
          }}>
            <button 
              type="button" 
              onClick={() => router.back()}
              style={{ 
                padding: '1rem 2.5rem', 
                borderRadius: '999px', 
                border: '1px solid #e2e8f0', 
                background: '#fff', 
                fontWeight: '600',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#f8fafc'}
              onMouseOut={(e) => e.target.style.background = '#fff'}
            >
              Discard
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ 
                padding: '1rem 4rem', 
                borderRadius: '999px', 
                border: 'none', 
                background: '#394B3F', 
                color: '#fff', 
                fontWeight: '700', 
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(57, 75, 63, 0.25)',
                transition: 'all 0.3s',
                opacity: submitting ? 0.7 : 1
              }}
              onMouseOver={(e) => !submitting && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 15px 30px rgba(57, 75, 63, 0.35)')}
              onMouseOut={(e) => !submitting && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 10px 25px rgba(57, 75, 63, 0.25)')}
            >
              {submitting ? 'Sharing...' : (user.role === 'admin' ? 'Publish Story' : 'Submit for Review')}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5, fontSize: '0.9rem' }}>
          By submitting, you agree to TatiAssam's community guidelines and content policies.
        </div>
      </div>
    </main>
  );
}
