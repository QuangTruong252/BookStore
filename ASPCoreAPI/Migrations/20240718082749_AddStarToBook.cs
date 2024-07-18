﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddStarToBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Star",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Star",
                table: "Books");
        }
    }
}