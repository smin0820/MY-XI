import type { FormationKey, FormationPosition } from "@/types/squad";

export const formations: Record<FormationKey, FormationPosition[]> = {
  "4-3-3": [
    { pos_x: "22.5%", pos_y: "20%" },
    { pos_x: "50%", pos_y: "20%" },
    { pos_x: "77.5%", pos_y: "20%" },

    { pos_x: "22.5%", pos_y: "45%" },
    { pos_x: "50%", pos_y: "45%" },
    { pos_x: "77.5%", pos_y: "45%" },

    { pos_x: "10%", pos_y: "70%" },
    { pos_x: "35%", pos_y: "70%" },
    { pos_x: "65%", pos_y: "70%" },
    { pos_x: "90%", pos_y: "70%" },

    { pos_x: "50%", pos_y: "95%" },
  ],

  "4-2-3-1": [
    { pos_x: "50%", pos_y: "10%" },

    { pos_x: "22.5%", pos_y: "30%" },
    { pos_x: "50%", pos_y: "30%" },
    { pos_x: "77.5%", pos_y: "30%" },

    { pos_x: "35%", pos_y: "50%" },
    { pos_x: "65%", pos_y: "50%" },

    { pos_x: "10%", pos_y: "70%" },
    { pos_x: "35%", pos_y: "70%" },
    { pos_x: "65%", pos_y: "70%" },
    { pos_x: "90%", pos_y: "70%" },

    { pos_x: "50%", pos_y: "95%" },
  ],

  "3-1-5-1": [
    { pos_x: "50%", pos_y: "10%" },

    { pos_x: "10%", pos_y: "30%" },
    { pos_x: "30%", pos_y: "30%" },
    { pos_x: "50%", pos_y: "30%" },
    { pos_x: "70%", pos_y: "30%" },
    { pos_x: "90%", pos_y: "30%" },

    { pos_x: "50%", pos_y: "50%" },

    { pos_x: "22.5%", pos_y: "70%" },
    { pos_x: "50%", pos_y: "70%" },
    { pos_x: "77.5%", pos_y: "70%" },

    { pos_x: "50%", pos_y: "95%" },
  ],
};
