/** 直投广告数据 */
export interface DirectAd {
  id: string
  title: string
  description: string
  contact: { label: string; value: string }[]
}

export const directAds: DirectAd[] = [
  {
    id: 'dicom-5t',
    title: '5T三甲医院影像资料 DICM格式，寻求合作',
    description:
      '三甲医院影像资料，DICM格式数据，5T容量，可用于医学影像AI训练、科研分析。诚信合作，欢迎联系。',
    contact: [
      { label: 'QQ', value: '2032785238' },
      { label: '电话', value: '13465321962' },
    ],
  },
]

/** 获取当前展示的直投广告 */
export function getDirectAd(): DirectAd | null {
  if (directAds.length === 0) return null
  return directAds[0]
}
