<script setup lang="ts">
const { latestTag } = useRuntimeConfig().public
const version = (latestTag as string).replace('filera-v', '')
const base = `https://github.com/joncorv/filera/releases/download/${latestTag}`
const releaseUrl = `https://github.com/joncorv/filera/releases/tag/${latestTag}`

const platforms = [
  {
    title: 'macOS',
    icon: 'i-simple-icons-apple',
    description: 'Universal binary (Apple Silicon + Intel). Download the .dmg, open it, and drag Filera to Applications.',
    to: `${base}/filera_${version}_universal.dmg`
  },
  {
    title: 'Windows',
    icon: 'i-simple-icons-windows',
    description: 'NSIS installer (.exe). Run the installer and follow the prompts. See the SmartScreen note below.',
    to: `${base}/filera_${version}_x64-setup.exe`
  },
  {
    title: 'Linux — Debian/Ubuntu',
    icon: 'i-simple-icons-debian',
    description: 'Download the .deb and install with sudo dpkg -i filera_*_amd64.deb',
    to: `${base}/filera_${version}_amd64.deb`
  },
  {
    title: 'Linux — Fedora/RHEL',
    icon: 'i-simple-icons-fedora',
    description: 'Download the .rpm and install with sudo rpm -i filera-*.x86_64.rpm',
    to: `${base}/filera-${version}-1.x86_64.rpm`
  }
]
</script>

<template>
  <div>
    <p class="text-sm text-(--ui-text-muted) mb-4">
      Downloading for <strong>{{ latestTag }}</strong> —
      <a :href="releaseUrl" target="_blank" class="underline">view release on GitHub</a>
    </p>

    <div class="grid grid-cols-2 gap-4">
      <UPageCard
        v-for="p in platforms"
        :key="p.title"
        :title="p.title"
        :description="p.description"
        :icon="p.icon"
        :to="p.to"
        target="_blank"
      />
    </div>
  </div>
</template>
