<script>
  import PartInfo from "../lib/components/PartInfo.svelte"

  let sample_part_info = {
    "partName": "Part 1",
    "partDescription": "Here's a part that is used as a sample.",
    "imgPath": "src/lib/images/sample-img.jpg",
    "id": "1"
  }

  let sample_part_info2 = {
    "partName": "Part 2",
    "partDescription": "Lorem Ipsum Lorem Ipsum",
    "imgPath": "src/lib/images/sample-img.jpg",
    "id": "2"
  }

</script>

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

<PartInfo info={sample_part_info}/>
<PartInfo info={sample_part_info2}/>

<style lang="postcss">
  
  
  :global(html) {
    background-color: theme(colors.gray.100);
  }


</style>
