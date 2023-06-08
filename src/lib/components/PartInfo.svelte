<script lang="ts">
  interface Info {
    partName: string;
    partDescription: string;
    imgPath: string;
    id: string;
  }

  export let info: Info;

</script>
  
  <div class="card card-compact w-64 bg-base-100 shadow-xl">
    <figure><img src={info.imgPath} alt={info.partName} /></figure>
    <div class="card-body">
      <h2 class="card-title">{info.partName}</h2>
      <p>Description: {info.partDescription}</p>
      <div class="card-actions justify-end">
      </div>
    </div>
  </div>