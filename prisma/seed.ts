import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 既存のデータをクリア
  await prisma.post.deleteMany()
  await prisma.subCategory.deleteMany()
  await prisma.category.deleteMany()

  // カテゴリを作成
  const videoEditingCategory = await prisma.category.create({
    data: {
      name: 'video-editing',
      title: '動画編集',
      description: 'クリエイティブな動画制作スキルを身につける',
      icon: 'VideoCameraIcon',
      color: 'from-red-400 to-pink-500',
      order: 1
    }
  })

  const englishCategory = await prisma.category.create({
    data: {
      name: 'english',
      title: '英語学習',
      description: 'グローバルコミュニケーション能力の向上',
      icon: 'LanguageIcon',
      color: 'from-blue-400 to-indigo-500',
      order: 2
    }
  })

  const awsCategory = await prisma.category.create({
    data: {
      name: 'aws',
      title: 'AWS',
      description: 'クラウドインフラストラクチャーの理解',
      icon: 'CloudIcon',
      color: 'from-orange-400 to-yellow-500',
      order: 3
    }
  })

  const aiCodingCategory = await prisma.category.create({
    data: {
      name: 'ai-coding',
      title: 'AIコーディング',
      description: '機械学習とAI開発スキルの習得',
      icon: 'CodeBracketIcon',
      color: 'from-purple-400 to-pink-500',
      order: 4
    }
  })

  const mindsetCategory = await prisma.category.create({
    data: {
      name: 'mindset',
      title: 'マインド整理',
      description: '考え方と思考パターンの改善',
      icon: 'LightBulbIcon',
      color: 'from-green-400 to-blue-500',
      order: 5
    }
  })

  const workInsightsCategory = await prisma.category.create({
    data: {
      name: 'work-insights',
      title: '仕事での気づき',
      description: '日々の業務から得られる学び',
      icon: 'BriefcaseIcon',
      color: 'from-gray-400 to-gray-600',
      order: 6
    }
  })

  const experimentsCategory = await prisma.category.create({
    data: {
      name: 'experiments',
      title: '実験・記録',
      description: '試行錯誤の記録と学び',
      icon: 'BeakerIcon',
      color: 'from-teal-400 to-cyan-500',
      order: 7
    }
  })

  // 新規カテゴリ：セブ生活での気づき
  const cebLifeCategory = await prisma.category.create({
    data: {
      name: 'cebu-life',
      title: 'セブ生活での気づき',
      description: 'セブ島での生活体験と文化的な学び',
      icon: 'GlobeAltIcon',
      color: 'from-emerald-400 to-teal-500',
      order: 8
    }
  })

  // AWS用のサブカテゴリを作成
  await prisma.subCategory.createMany({
    data: [
      {
        categoryId: awsCategory.id,
        name: 'ec2',
        title: 'EC2',
        description: 'Elastic Compute Cloudの学習',
        order: 1
      },
      {
        categoryId: awsCategory.id,
        name: 's3',
        title: 'S3',
        description: 'Simple Storage Serviceの学習',
        order: 2
      },
      {
        categoryId: awsCategory.id,
        name: 'networking',
        title: 'ネットワーキング',
        description: 'VPC、セキュリティグループなど',
        order: 3
      }
    ]
  })

  // AIコーディング用のサブカテゴリ
  await prisma.subCategory.createMany({
    data: [
      {
        categoryId: aiCodingCategory.id,
        name: 'machine-learning',
        title: '機械学習',
        description: 'scikit-learn、TensorFlowなど',
        order: 1
      },
      {
        categoryId: aiCodingCategory.id,
        name: 'llm',
        title: 'LLM活用',
        description: 'ChatGPT API、プロンプトエンジニアリング',
        order: 2
      }
    ]
  })

  console.log('シードデータの投入が完了しました！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 