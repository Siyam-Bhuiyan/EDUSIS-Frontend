const db = require("./db");
const bcrypt = require('bcrypt');

const hashPasswords = async () => {
    try {
        const query = "SELECT user_id, user_password FROM UsersInfo";
        db.query(query, async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return;
            }

            for (const user of results) {
                const hashedPassword = await bcrypt.hash(user.user_password, 10);
                const updateQuery = "UPDATE UsersInfo SET user_password = ? WHERE user_id = ?";
                db.query(updateQuery, [hashedPassword, user.user_id], (err, result) => {
                    if (err) {
                        console.error("Error updating password:", err);
                    } else {
                        console.log(`Password for user_id ${user.user_id} updated successfully.`);
                    }
                });
            }
            console.log("Passwords hashed successfully.");
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

hashPasswords();