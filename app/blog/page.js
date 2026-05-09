"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../info.module.css';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Stories & Insights</span>
        <h1>Heritage Blog</h1>
        <p className={styles.heroSub}>
          Dive into the rich world of Assamese textiles — culture, craft, style, and the
          artisans who keep these traditions alive.
        </p>
        <Link 
          href="/blog/create" 
          className={styles.heroBadge} 
          style={{ cursor: 'pointer', marginTop: '2rem', display: 'inline-block', background: '#fff', color: '#394B3F' }}
        >
          Write a Story
        </Link>
      </div>

      <div className={styles.containerWide}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading heritage stories...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p>No stories found yet. Be the first to share one!</p>
          </div>
        ) : (
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className={styles.blogCard}>
                <img src={post.image} alt={post.title} className={styles.blogImg} />
                <div className={styles.blogBody}>
                  <span className={styles.blogTag}>{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className={styles.blogMeta}>
                    {new Date(post.createdAt).toLocaleDateString()} · {post.author?.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
