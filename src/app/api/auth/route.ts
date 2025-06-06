import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secret-password'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      
      // 管理者として認証されたことを示すクッキーを設定
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1週間
        path: '/'
      })
      
      return response
    } else {
      return NextResponse.json(
        { success: false, message: 'パスワードが間違っています' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '認証エラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const adminAuth = request.cookies.get('admin-auth')
  
  if (adminAuth?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin-auth')
  return response
} 