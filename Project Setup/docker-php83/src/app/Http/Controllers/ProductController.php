<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
        /**
         * $products = Product::all();
         * return response()->json($products);
         */
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'integer'
        ]);

        return Product::create($data); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
       return $product; // return response()
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
            $product->update($request->all()); 

            return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy($id) 
    { 
       $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(null, 204);
    }

}
