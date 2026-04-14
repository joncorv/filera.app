<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()

const [{ data: page }, { data: surround }] = await Promise.all([
  useAsyncData(route.path, () =>
    queryCollection('docs').path(route.path).first()
  ),
  useAsyncData(`surround-${route.path}`, () =>
    queryCollectionItemSurroundings('docs', route.path, {
      fields: ['title', 'description', 'path']
    })
  )
])

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: () => page.value ? `${page.value.title} — Filera Docs` : 'Filera Docs',
  description: () => page.value?.description ?? ''
})

// Resolve the section name from the path for the headline
const headline = computed(() => {
  const parts = route.path.replace('/docs/', '').split('/')
  if (parts.length < 2) return ''
  return parts[0]
    .split('-')
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
})

const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])

const [prev, next] = [surround.value?.[0], surround.value?.[1]]
</script>

<template>
  <div v-if="page" class="flex gap-10 py-8 lg:py-12">

    <!-- Main content -->
    <div class="flex-1 min-w-0">

      <!-- Category label -->
      <p v-if="headline" class="text-xs font-semibold uppercase tracking-widest text-(--ui-text-muted) mb-6">
        {{ headline }}
      </p>

      <!-- Content -->
      <ContentRenderer :value="page" />

      <!-- Prev / Next -->
      <div v-if="prev || next" class="mt-12 pt-8 border-t border-(--ui-border)">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <NuxtLink
            v-if="prev"
            :to="prev.path"
            class="group flex flex-col gap-3 border border-(--ui-border) rounded-xl px-6 py-5 hover:border-(--ui-border-accented) hover:bg-(--ui-bg-elevated)/50 transition-all"
          >
            <div class="flex items-center gap-2 text-(--ui-text-muted)">
              <div class="size-7 rounded-full flex items-center justify-center bg-(--ui-bg-elevated) ring-1 ring-(--ui-border) group-hover:bg-(--ui-primary)/10 group-hover:ring-(--ui-primary)/50 transition-all">
                <UIcon name="i-lucide-arrow-left" class="size-3.5 group-hover:text-(--ui-primary) transition-colors" />
              </div>
              <span class="text-xs font-medium">Previous</span>
            </div>
            <div>
              <p class="text-[15px] font-medium text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors truncate">
                {{ prev.title }}
              </p>
              <p v-if="prev.description" class="text-sm text-(--ui-text-muted) line-clamp-2 mt-0.5">
                {{ prev.description }}
              </p>
            </div>
          </NuxtLink>
          <div v-else />

          <NuxtLink
            v-if="next"
            :to="next.path"
            class="group flex flex-col gap-3 border border-(--ui-border) rounded-xl px-6 py-5 hover:border-(--ui-border-accented) hover:bg-(--ui-bg-elevated)/50 transition-all text-end"
          >
            <div class="flex items-center gap-2 text-(--ui-text-muted) justify-end">
              <span class="text-xs font-medium">Next</span>
              <div class="size-7 rounded-full flex items-center justify-center bg-(--ui-bg-elevated) ring-1 ring-(--ui-border) group-hover:bg-(--ui-primary)/10 group-hover:ring-(--ui-primary)/50 transition-all">
                <UIcon name="i-lucide-arrow-right" class="size-3.5 group-hover:text-(--ui-primary) transition-colors" />
              </div>
            </div>
            <div>
              <p class="text-[15px] font-medium text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors truncate">
                {{ next.title }}
              </p>
              <p v-if="next.description" class="text-sm text-(--ui-text-muted) line-clamp-2 mt-0.5">
                {{ next.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- Right TOC (desktop only, hides only on mobile/tablet) -->
    <aside class="hidden lg:block w-44 shrink-0">
      <div class="sticky top-[calc(var(--ui-header-height)+2rem)]">
        <DocsToc :links="tocLinks" />

        <!-- Edit on GitHub -->
        <div class="mt-8 pt-6 border-t border-(--ui-border) space-y-2">
          <a
            :href="`https://github.com/joncorv/filera/edit/main/filera.app/content${route.path}.md`"
            target="_blank"
            class="flex items-center gap-2 text-sm text-(--ui-text-muted) hover:text-(--ui-text) transition-colors"
          >
            <UIcon name="i-lucide-pencil" class="size-3.5 shrink-0" />
            Edit this page
          </a>
          <a
            href="https://github.com/joncorv/filera"
            target="_blank"
            class="flex items-center gap-2 text-sm text-(--ui-text-muted) hover:text-(--ui-text) transition-colors"
          >
            <UIcon name="i-lucide-star" class="size-3.5 shrink-0" />
            Star on GitHub
          </a>
        </div>
      </div>
    </aside>

  </div>
</template>
