<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Toys'];
        
        return [
            'name' => $this->faker->words(random_int(2, 4), true),
            'description' => $this->faker->paragraph(random_int(2, 4)),
            'price' => $this->faker->randomFloat(2, 9.99, 999.99),
            'image_url' => 'https://picsum.photos/400/400?random=' . $this->faker->numberBetween(1, 1000),
            'stock' => $this->faker->numberBetween(0, 100),
            'category' => $this->faker->randomElement($categories),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}