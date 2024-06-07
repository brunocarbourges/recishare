const CONST = {
    MIN_UN_LEN: 8,
    MIN_PW_LEN: 8,
    RID_LEN : 24,  /* length of the recipe ID */
    UID_LEN : 24,  /* length of the user ID */
    SALT: 12,  /* salt for password hash (helps randomize) */
    MAX_FILE_SIZE: 50,
        // only these tags can be searched
    POSSIBLE_TAGS: [
        'vegetarian', 'vegan', 'glutenfree', 'nutfree',
        'dairyfree', 'lowsodium', 'lowcarb', 'keto',
    ],

};

export {CONST};