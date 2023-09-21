using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RenderGallery.Migrations
{
    /// <inheritdoc />
    public partial class rendergallery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Pic = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Chat",
                columns: table => new
                {
                    conversation_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_one = table.Column<int>(type: "int", nullable: true),
                    user_two = table.Column<int>(type: "int", nullable: true),
                    time = table.Column<DateTime>(type: "datetime", nullable: true),
                    status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chat", x => x.conversation_id);
                    table.ForeignKey(
                        name: "FK_Chat_Users_user_one",
                        column: x => x.user_one,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Chat_Users_user_two",
                        column: x => x.user_two,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    msg_content = table.Column<string>(type: "text", nullable: false),
                    conversation_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    time = table.Column<DateTime>(type: "datetime", nullable: true),
                    visu_status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.id);
                    table.ForeignKey(
                        name: "FK_Message_Chat_conversation_id",
                        column: x => x.conversation_id,
                        principalTable: "Chat",
                        principalColumn: "conversation_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chat_user_one",
                table: "Chat",
                column: "user_one");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_user_two",
                table: "Chat",
                column: "user_two");

            migrationBuilder.CreateIndex(
                name: "IX_Message_conversation_id",
                table: "Message",
                column: "conversation_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "Chat");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
