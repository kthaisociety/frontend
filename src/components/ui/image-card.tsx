"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { cn } from "@/lib/utils"

interface ImageCardProps {
  image: string
  alt: string
  aspectRatio?: string
  blurHeight?: string
  gradientColors?: {
    from: string
    via: string
    to: string
  }
  tags?: string[]
  topContent?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ImageCard({
  image,
  alt,
  aspectRatio = "aspect-[22/25]",
  blurHeight = "40%",
  gradientColors = {
    from: "from-black/60",
    via: "via-black/20",
    to: "to-transparent",
  },
  tags,
  topContent,
  children,
  className,
}: ImageCardProps) {
  return (
    <Card className={cn("group relative overflow-hidden cursor-pointer transition-transform w-full", aspectRatio, className)}>
      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-102">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Progressive Blur Overlay */}
      <ProgressiveBlur
        position="bottom"
        height={blurHeight}
        className="absolute left-0 right-0 bottom-0"
      />

      {/* Gradient overlay for better text readability */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t pointer-events-none z-15",
          gradientColors.from,
          gradientColors.via,
          gradientColors.to
        )}
      />

      {/* Tags or Top Content */}
      {(tags || topContent) && (
        <div className="absolute top-6 left-6 right-6 z-20 flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary backdrop-blur-sm text-white font-mono capitalize"
            >
              {tag}
            </span>
          ))}
          {topContent}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          {children}
      </div>
    </Card>
  )
}

