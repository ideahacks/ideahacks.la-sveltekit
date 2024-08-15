<script> 


    export let part_data
</script>


<div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src= {part_data.image}
      alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{part_data.name}</h2>
    <p>Quantity: {part_data.quantity}</p>
    <p>ID: {part_data.id}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</div>