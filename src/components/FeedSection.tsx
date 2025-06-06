'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface Post {
  id: string
  mediaUrl?: string
  mediaType?: 'image' | 'video'
  text: string
  createdAt: string
  likes: number
  liked: boolean
}

export default function FeedSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  // Tiptapエディタ初期化
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: ''
  })

  // Load posts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('feed-posts')
    if (stored) {
      setPosts(JSON.parse(stored))
    }
  }, [])

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem('feed-posts', JSON.stringify(posts))
  }, [posts])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0]
    if (selected) {
      setFile(selected)
      const url = URL.createObjectURL(selected)
      setPreviewUrl(url)
    }
  }

  const handlePost = () => {
    const content = editor?.getHTML() || ''
    if (!content.trim() && !file) return
    let mediaUrl: string | undefined
    let mediaType: 'image' | 'video' | undefined
    if (file) {
      mediaUrl = previewUrl || undefined
      mediaType = file.type.startsWith('video') ? 'video' : 'image'
    }
    const newPost: Post = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      mediaUrl,
      mediaType,
      text: content,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      liked: false,
    }
    setPosts(prev => [newPost, ...prev])
    editor?.commands.clearContent()
    setFile(null)
    setPreviewUrl(null)
  }

  const toggleLike = (id: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  return (
    <section id="feed" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">自分の投稿</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 投稿一覧 */}
          <div className="flex-1 space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{post.createdAt}</span>
                  <button onClick={() => toggleLike(post.id)} className="flex items-center text-sm">
                    {post.liked ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartOutlineIcon className="h-6 w-6 text-gray-500" />
                    )}
                    <span className="ml-1">{post.likes}</span>
                  </button>
                </div>
                {post.mediaUrl && (
                  <div className="mb-2">
                    {post.mediaType === 'video' ? (
                      <video controls src={post.mediaUrl} className="max-h-96 w-full rounded" />
                    ) : (
                      <img src={post.mediaUrl} className="max-h-96 w-full object-contain rounded" />
                    )}
                  </div>
                )}
                {post.text && (
                  <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: post.text }} />
                )}
              </div>
            ))}
          </div>

          {/* 投稿フォーム */}
          <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow" tabIndex={0}
               onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handlePost() }}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">新規投稿</h3>
            {/* Tiptap リッチテキストエディタ */}
            <div className="mb-2 flex gap-2">
              <button onClick={() => editor?.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">B</button>
              <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">I</button>
              <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded">•</button>
              <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded">1.</button>
            </div>
            <EditorContent editor={editor} className="border border-gray-300 rounded mb-4 p-2 h-40 overflow-y-auto" />
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="mb-4" />
            {previewUrl && (
              <div className="mb-4">
                {file?.type.startsWith('video') ? (
                  <video controls src={previewUrl} className="max-h-64 w-full rounded" />
                ) : (
                  <img src={previewUrl} className="max-h-64 w-full object-contain rounded" />
                )}
              </div>
            )}
            <button onClick={handlePost} className="w-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition mb-2">
              投稿 (Ctrl+Enter)
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 