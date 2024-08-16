<script>
    import TeamCard from "$lib/components/TeamCard.svelte";

    const team1 = {
        number: 1,
        members: ["abby", "betty", "caleb"],
        parts: [23345, 23588, 47810]
    }

</script>

<TeamCard team_info={team1}/>