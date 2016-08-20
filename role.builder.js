var roleBuilder =
{
    /** @param {Creep} creep **/
    run: function (creep)
    {
        // Checks if the creep is building and is out of energy
        if (creep.memory.building && creep.carry.energy == 0)
        {
            creep.memory.building = false;
        }
        // Checks if the creep is not building and has full energy
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.building = true;
        }

        // Checks if the creep is tasked to build
        if (creep.memory.building)
        {
            // If it is tasked to build finds a construction site
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            // Checks if the size of the construction site list is greater then 0
            if (targets.length)
            {
                // Attempts to build on the construction site
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                {
                    // If the construction site is out of range it move to the construction site
                    creep.moveTo(targets[0]);
                }
            }
        }
        else
        {
            // If the creeps is not building find a nearby resource node
            var sources = creep.room.find(FIND_SOURCES);

            // Attempt to harvest from the nearest
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                // If out of harvesting range move to the resource node
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleBuilder;