import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// カテゴリ一覧取得
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            posts: {
              where: {
                status: 'PUBLISHED'
              }
            }
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('カテゴリ取得エラー:', error)
    return NextResponse.json(
      { error: 'カテゴリの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// カテゴリ作成
export async function POST(request: NextRequest) {
  // 認証チェック
  const adminAuth = request.cookies.get('admin-auth')
  if (adminAuth?.value !== 'authenticated') {
    return NextResponse.json(
      { error: '認証が必要です' },
      { status: 401 }
    )
  }

  try {
    const { name, title, description, icon, color, order } = await request.json()

    const category = await prisma.category.create({
      data: {
        name,
        title,
        description,
        icon,
        color,
        order: order || 0
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('カテゴリ作成エラー:', error)
    return NextResponse.json(
      { error: 'カテゴリの作成に失敗しました' },
      { status: 500 }
    )
  }
} 