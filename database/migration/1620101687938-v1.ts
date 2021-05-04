import {MigrationInterface, QueryRunner} from "typeorm";

export class v11620101687938 implements MigrationInterface {
    name = 'v11620101687938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `full_name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `token` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, UNIQUE INDEX `IDX_d9959ee7e17e2293893444ea37` (`token`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `token` ADD CONSTRAINT `FK_e50ca89d635960fda2ffeb17639` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("INSERT INTO `user` (`id`, `username`, `full_name`) VALUES (1, 'yasha', 'Yashahime'), (2, 'totoro', 'Totoro')");
        await queryRunner.query("INSERT INTO `token` (`token`, `user_id`) VALUES ('abc123', 1), ('def456', 2)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `token` DROP FOREIGN KEY `FK_e50ca89d635960fda2ffeb17639`");
        await queryRunner.query("DROP INDEX `IDX_d9959ee7e17e2293893444ea37` ON `token`");
        await queryRunner.query("DROP TABLE `token`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
