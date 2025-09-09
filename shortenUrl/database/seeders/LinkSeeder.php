<?php

namespace Database\Seeders;

use App\Models\Link;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LinkSeeder extends Seeder
{
    public function run(): void
    {
        // tạo 50 link mẫu
        for ($i = 0; $i < 50; $i++) {
            Link::create([
                'code' => self::uniqueCode(),
                'long_url' => fake()->url(),
                'clicks' => fake()->numberBetween(0, 500),
            ]);
        }
    }

    // đảm bảo code unique (đơn giản)
    public static function uniqueCode(int $len = 6): string
    {
        do {
            $code = Str::lower(Str::random($len));
        } while (Link::where('code', $code)->exists());

        return $code;
    }
}
