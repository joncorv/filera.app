<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
  children?: { id: string; depth: number; text: string }[]
}

defineProps<{
  links: TocLink[]
}>()

const activeId = ref('')

onMounted(() => {
  const headings = document.querySelectorAll('h2[id], h3[id]')
  if (!headings.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
  )

  headings.forEach(el => observer.observe(el))
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div v-if="links?.length" class="space-y-3">
    <p class="text-sm font-semibold text-(--ui-text-highlighted)">
      On this page
    </p>
    <ul class="space-y-1.5 border-s border-(--ui-border) text-sm">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="flex items-center py-1 ps-3 -ms-px border-s transition-colors overflow-hidden"
          :class="activeId === link.id
            ? 'text-(--ui-primary) border-(--ui-primary) font-medium'
            : 'text-(--ui-text-muted) border-transparent hover:text-(--ui-text) hover:border-(--ui-border-accented)'"
        >
          <span class="truncate">{{ link.text }}</span>
        </a>
        <ul v-if="link.children?.length" class="ms-3 mt-1 space-y-1">
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="flex items-center py-1 ps-3 -ms-px border-s text-sm transition-colors overflow-hidden"
              :class="activeId === child.id
                ? 'text-(--ui-primary) border-(--ui-primary) font-medium'
                : 'text-(--ui-text-muted) border-transparent hover:text-(--ui-text) hover:border-(--ui-border-accented)'"
            >
              <span class="truncate">{{ child.text }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
