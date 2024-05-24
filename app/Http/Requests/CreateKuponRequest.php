<?php

namespace App\Http\Requests;

use App\Models\Kupon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateKuponRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'kode' => ['required', 'string', 'max:4'],
            'expired_at' => ['required', 'date'],
            'name' => ['required', 'string', 'max:255'],
            'desc' => ['required', 'string', 'max:255'],
            'is_claim' => ['required', 'boolean']
        ];
    }
}
