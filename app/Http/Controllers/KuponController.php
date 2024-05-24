<?php

namespace App\Http\Controllers;

use App\Models\Kupon;
use App\Http\Requests\CreateKuponRequest;
use Illuminate\Http\Request;
use App\Http\Resources\KuponCollection;
use App\Http\Resources\KuponResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class KuponController extends Controller
{
    public function getAll()
    {
        $kupons = Kupon::all();
        return Inertia::render('Kupon/All', [
            'kupons' => new KuponCollection($kupons)
        ]);
    }

    public function getSingle($id)
    {
        $kupon = Kupon::find($id);

        if (!$kupon) {
            return response()->json(['message' => 'Kupon not found'], 404);
        }

        return Inertia::render('Kupon/Detail', [
            'kupon' => $kupon
        ]);
    }

    public function create(): Response  {
        return Inertia::render('Kupon/Create');
    }

    public function store(CreateKuponRequest $request): RedirectResponse
{
    $data = $request->validated();

    Kupon::create([
        'kode' => $data['kode'],
        'name' => $data['name'],
        'expired_at' => $data['expired_at'],
        'desc' => $data['desc'],
        'is_claim' => $data['is_claim']
    ]);
    
    return Redirect::route('kupon.all')->with('success', 'Tambah Kupon Berhasil');
}


    public function update(Request $request, $id) {
        $kupon = Kupon::findOrFail($id);

        $request->validate([
            'is_claim' => 'boolean',
            'expired_at' => 'required|date',
            'name' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
        ]);

        $data = $request->only(['is_claim', 'expired_at', 'name', 'desc']);


        $kupon->update($data);

        return Redirect::route('kupon.all')->with('success', 'Kupon updated successfully.');
    } 

    public function delete($id): RedirectResponse {
        $kupon = Kupon::findOrFail($id);
        $kupon->delete();
        return Redirect::route('kupon.all');
    }

    public function claim(Request $request, $kode) {
        // Temukan kupon dengan kode yang diberikan
        $kupon = Kupon::where('kode', $kode)->first();
    
        // Periksa apakah kupon ditemukan
        if (!$kupon) {
            return response()->json(['error' => 'Kupon not found.'], 404);
        }
    
        // Periksa apakah kupon sudah di-claim
        if ($kupon->is_claim) {
            return response()->json('Kupon Sudah di klaim', 400);
        }
    
        $kupon->is_claim = true;
    
        $kupon->save();
    
        // Mengembalikan respons JSON dengan pesan sukses
        return response()->json(['success' => 'Kupon Claim Success']);
    }
    
    public function edit($id): Response {
        $kupon = Kupon::findOrFail($id);
        return Inertia::render('Kupon/Edit', [
            'kupon' => $kupon
        ]);
    }

    public function scan()
    {
        return Inertia::render('Kupon/Scan');
    }
}