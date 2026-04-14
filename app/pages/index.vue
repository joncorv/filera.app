<template>
  <div>
    <UPageHero
      title="Batch file renaming, done right."
      description="Filera is a fast, cross-platform tool for renaming hundreds of files at once. Build a pipeline of tasks and filters, see a live preview, then rename with one click."
      :links="[{
        label: 'Read the docs',
        to: '/docs/getting-started/introduction',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Download',
        to: 'https://github.com/joncorv/filera/releases',
        target: '_blank',
        icon: 'i-simple-icons-github',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="Rename smarter, not harder"
      description="Filera combines a powerful rename engine with a visual pipeline interface. No scripting. No regex required. Just results."
      :features="[{
        icon: 'i-lucide-eye',
        title: 'Live preview',
        description: 'See every old name and new name side-by-side as you build your pipeline. Nothing changes on disk until you say so.'
      }, {
        icon: 'i-lucide-list-ordered',
        title: 'Task pipeline',
        description: 'Stack rename tasks in any order — find & replace, number sequences, dates, custom text, case conversion, and more.'
      }, {
        icon: 'i-lucide-filter',
        title: 'Smart filters',
        description: 'Target exactly the files you want by name, file type, date range, or size. Filtered files are dimmed in the preview and skipped at rename time.'
      }, {
        icon: 'i-lucide-folder-open',
        title: 'Recursive folder support',
        description: 'Open entire directory trees at once. Filera walks subfolders automatically so you can rename an entire library in one pass.'
      }, {
        icon: 'i-lucide-copy',
        title: 'Flexible output',
        description: 'Rename files in place, copy renamed files to a new directory, or move them — whatever fits your workflow.'
      }, {
        icon: 'i-lucide-monitor',
        title: 'Truly cross-platform',
        description: 'Built with Tauri and Rust. Native performance on Windows, macOS, and Linux with a single consistent interface.'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="Ready to tame your file chaos?"
        description="Download Filera for free or read the documentation to learn what it can do."
        variant="subtle"
        :links="[{
          label: 'Read the docs',
          to: '/docs/getting-started/introduction',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral'
        }, {
          label: 'Download on GitHub',
          to: 'https://github.com/joncorv/filera/releases',
          target: '_blank',
          icon: 'i-simple-icons-github',
          color: 'neutral',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>
