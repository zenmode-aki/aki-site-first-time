import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 認証チェック
function isAuthenticated(request: NextRequest) {
  const adminAuth = request.cookies.get('admin-auth')
  return adminAuth?.value === 'authenticated'
}

// 投稿一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const subCategoryId = searchParams.get('subCategoryId')
    const status = searchParams.get('status') || 'PUBLISHED'

    const where: any = {
      status: status as any
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (subCategoryId) {
      where.subCategoryId = subCategoryId
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        category: true,
        subCategory: true,
        media: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('投稿取得エラー:', error)
    return NextResponse.json(
      { error: '投稿の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 投稿作成
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: '認証が必要です' },
      { status: 401 }
    )
  }

  try {
    const {
      title,
      content,
      excerpt,
      categoryId,
      subCategoryId,
      tags,
      status = 'PUBLISHED',
      media = []
    } = await request.json()

    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        categoryId,
        subCategoryId,
        tags,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        media: {
          create: media.map((m: any, index: number) => ({
            type: m.type,
            url: m.url,
            alt: m.alt,
            caption: m.caption,
            order: index
          }))
        }
      },
      include: {
        category: true,
        subCategory: true,
        media: true
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('投稿作成エラー:', error)
    return NextResponse.json(
      { error: '投稿の作成に失敗しました' },
      { status: 500 }
    )
  }
} 