import { NextRequest, NextResponse } from 'next/server'

interface HealthData {
  type: 'steps' | 'sleep'
  value: number
  date: string
}

// 一時的なデータストレージ（本番ではデータベースを使用）
let healthDataStore: HealthData[] = []

export async function POST(request: NextRequest) {
  try {
    const data: HealthData = await request.json()
    
    // データの検証
    if (!data.type || typeof data.value !== 'number' || !data.date) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }

    // 同じ日付・タイプのデータがあれば更新、なければ追加
    const existingIndex = healthDataStore.findIndex(
      item => item.date === data.date && item.type === data.type
    )

    if (existingIndex >= 0) {
      healthDataStore[existingIndex] = data
    } else {
      healthDataStore.push(data)
    }

    // 最新7日分のみを保持
    healthDataStore = healthDataStore
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 14) // steps + sleep で最大14件

    console.log('Health data updated:', data)

    return NextResponse.json({ 
      success: true, 
      message: 'Health data updated successfully',
      data: data
    })

  } catch (error) {
    console.error('Error processing health data:', error)
    return NextResponse.json(
      { error: 'Failed to process health data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // 日付でソートして返す
    const sortedData = healthDataStore.sort((a, b) => a.date.localeCompare(b.date))
    
    return NextResponse.json({
      success: true,
      data: sortedData,
      count: sortedData.length
    })

  } catch (error) {
    console.error('Error fetching health data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch health data' },
      { status: 500 }
    )
  }
}

// CORS対応（iOS Shortcutsからのリクエスト用）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 