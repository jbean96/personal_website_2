import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import styles from 'styles/Home.module.css';
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Josh Bean</title>
        <meta name="description" content="Josh Bean's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hey, I'm Josh!
        </h1>
        <Link href="/blog">Blog</Link>
      </main>
    </div>
  )
}

export default Home
