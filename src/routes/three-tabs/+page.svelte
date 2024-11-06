<script lang="ts">
  import { IconPage, filterIconsByKeyword } from 'runes-webkit';
  import * as icons from '../awesome-samples';
  const keywordsToInclude = 'Solid';
  const keyIcons = filterIconsByKeyword(icons, keywordsToInclude);
  // console.log('icons: ', icons);
</script>

<IconPage icons={keyIcons} title="Three Tabs" defaultSize="16" minSize="12" maxSize="40" />
