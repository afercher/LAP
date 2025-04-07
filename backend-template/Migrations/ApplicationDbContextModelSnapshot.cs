﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Webshop.Models.DB;

#nullable disable

namespace Webshop.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Webshop.App.src.main.Models.Address", b =>
                {
                    b.Property<int>("Addressid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("address_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Addressid"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("city")
                        .HasAnnotation("Relational:JsonPropertyName", "city");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("country")
                        .HasAnnotation("Relational:JsonPropertyName", "country");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name")
                        .HasAnnotation("Relational:JsonPropertyName", "name");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("postal_code")
                        .HasAnnotation("Relational:JsonPropertyName", "postal_code");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("state")
                        .HasAnnotation("Relational:JsonPropertyName", "state");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("address")
                        .HasAnnotation("Relational:JsonPropertyName", "address");

                    b.HasKey("Addressid");

                    b.ToTable("addresses");

                    b.HasAnnotation("Relational:JsonPropertyName", "address");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Cart", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("UserId", "ProductId");

                    b.ToTable("carts");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Relational:JsonPropertyName", "id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name")
                        .HasAnnotation("Relational:JsonPropertyName", "name");

                    b.HasKey("CategoryId");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Inventory", b =>
                {
                    b.Property<int>("InventoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("InventoryId"));

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("InventoryId");

                    b.HasIndex("ProductId");

                    b.ToTable("inventory");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("order_id")
                        .HasAnnotation("Relational:JsonPropertyName", "id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("OrderId"));

                    b.Property<int>("AddressId")
                        .HasColumnType("integer")
                        .HasColumnName("address_id");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("order_date")
                        .HasAnnotation("Relational:JsonPropertyName", "created_at");

                    b.Property<decimal?>("TotalAmount")
                        .HasColumnType("numeric")
                        .HasColumnName("total_amount");

                    b.HasKey("OrderId");

                    b.HasIndex("AddressId");

                    b.HasIndex("CustomerId");

                    b.ToTable("orders");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.OrderDetails", b =>
                {
                    b.Property<int>("OrderId")
                        .HasColumnType("integer")
                        .HasColumnName("order_id");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("price_per_unit");

                    b.HasKey("OrderId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("order_items");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Payment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PaymentId"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("PaymentId");

                    b.ToTable("payments");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Relational:JsonPropertyName", "id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ProductId"));

                    b.Property<decimal?>("AverageRating")
                        .HasColumnType("numeric")
                        .HasColumnName("average_rating")
                        .HasAnnotation("Relational:JsonPropertyName", "average_rating");

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer")
                        .HasColumnName("category_id")
                        .HasAnnotation("Relational:JsonPropertyName", "category_id");

                    b.Property<int?>("FiveStars")
                        .HasColumnType("integer")
                        .HasColumnName("five_stars")
                        .HasAnnotation("Relational:JsonPropertyName", "five_stars");

                    b.Property<int?>("FourStars")
                        .HasColumnType("integer")
                        .HasColumnName("four_stars")
                        .HasAnnotation("Relational:JsonPropertyName", "four_stars");

                    b.Property<string>("ImageHeight")
                        .HasColumnType("text")
                        .HasColumnName("image_height")
                        .HasAnnotation("Relational:JsonPropertyName", "image_height");

                    b.Property<string>("ImageWidth")
                        .HasColumnType("text")
                        .HasColumnName("image_width")
                        .HasAnnotation("Relational:JsonPropertyName", "image_width");

                    b.Property<int?>("OneStar")
                        .HasColumnType("integer")
                        .HasColumnName("one_star")
                        .HasAnnotation("Relational:JsonPropertyName", "one_star");

                    b.Property<string>("ProductBlurredImage")
                        .HasColumnType("text")
                        .HasColumnName("blurred_image")
                        .HasAnnotation("Relational:JsonPropertyName", "blurred_image");

                    b.Property<int?>("ProductBlurredImageHeight")
                        .HasColumnType("integer")
                        .HasColumnName("blurred_image_height")
                        .HasAnnotation("Relational:JsonPropertyName", "blurred_image_height");

                    b.Property<int?>("ProductBlurredImageWidth")
                        .HasColumnType("integer")
                        .HasColumnName("blurred_image_width")
                        .HasAnnotation("Relational:JsonPropertyName", "blurred_image_width");

                    b.Property<string>("ProductDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description")
                        .HasAnnotation("Relational:JsonPropertyName", "description");

                    b.Property<string>("ProductImage")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("image_url")
                        .HasAnnotation("Relational:JsonPropertyName", "image_url");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name")
                        .HasAnnotation("Relational:JsonPropertyName", "name");

                    b.Property<decimal>("ProductPricePerUnit")
                        .HasColumnType("decimal(5, 2)")
                        .HasColumnName("price_per_unit")
                        .HasAnnotation("Relational:JsonPropertyName", "price_per_unit");

                    b.Property<int?>("ThreeStars")
                        .HasColumnType("integer")
                        .HasColumnName("three_stars")
                        .HasAnnotation("Relational:JsonPropertyName", "three_stars");

                    b.Property<int?>("TotalReviews")
                        .HasColumnType("integer")
                        .HasColumnName("total_reviews")
                        .HasAnnotation("Relational:JsonPropertyName", "total_reviews");

                    b.Property<int?>("TwoStars")
                        .HasColumnType("integer")
                        .HasColumnName("two_stars")
                        .HasAnnotation("Relational:JsonPropertyName", "two_stars");

                    b.HasKey("ProductId");

                    b.HasIndex("CategoryId");

                    b.ToTable("products");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.ProductRating", b =>
                {
                    b.Property<decimal>("AverageRating")
                        .HasColumnType("numeric")
                        .HasColumnName("average_rating");

                    b.Property<int>("FiveStars")
                        .HasColumnType("integer")
                        .HasColumnName("five_stars");

                    b.Property<int>("FourStars")
                        .HasColumnType("integer")
                        .HasColumnName("four_stars");

                    b.Property<int>("OneStar")
                        .HasColumnType("integer")
                        .HasColumnName("one_star");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<int>("ThreeStars")
                        .HasColumnType("integer")
                        .HasColumnName("three_stars");

                    b.Property<int>("TotalReviews")
                        .HasColumnType("integer")
                        .HasColumnName("total_reviews");

                    b.Property<int>("TwoStars")
                        .HasColumnType("integer")
                        .HasColumnName("two_stars");

                    b.ToTable("product_ratings", null, t =>
                        {
                            t.ExcludeFromMigrations();
                        });
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Review", b =>
                {
                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("comment");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<decimal>("Rating")
                        .HasColumnType("numeric")
                        .HasColumnName("rating");

                    b.HasKey("ProductId", "CustomerId");

                    b.HasIndex("CustomerId");

                    b.ToTable("reviews");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.User", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CustomerId"));

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("display_name")
                        .HasAnnotation("Relational:JsonPropertyName", "display_name");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password_hash");

                    b.Property<DateTime>("PasswordChangedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("password_changed_at");

                    b.Property<string>("PictureDataUrl")
                        .HasColumnType("text")
                        .HasColumnName("picture_data_url")
                        .HasAnnotation("Relational:JsonPropertyName", "user_picture_data_url");

                    b.HasKey("CustomerId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("users");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Inventory", b =>
                {
                    b.HasOne("Webshop.App.src.main.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Order", b =>
                {
                    b.HasOne("Webshop.App.src.main.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Webshop.App.src.main.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.OrderDetails", b =>
                {
                    b.HasOne("Webshop.App.src.main.Models.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Webshop.App.src.main.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Product", b =>
                {
                    b.HasOne("Webshop.App.src.main.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.Review", b =>
                {
                    b.HasOne("Webshop.App.src.main.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Webshop.App.src.main.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Webshop.App.src.main.Models.User", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
